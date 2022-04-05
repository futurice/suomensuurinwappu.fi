import path from 'path';
import {
  App,
  Stack,
  Duration,
  CfnOutput,
  StackProps,
  aws_s3 as s3,
  aws_cloudfront as cloudfront,
  aws_s3_deployment as s3deploy,
  aws_cloudfront_origins as origins,
} from 'aws-cdk-lib';
import { IConfig } from './index';

export enum WappuStage {
  DEV = 'dev',
  PROD = 'prod',
}

interface WappuProps extends StackProps {
  stage: WappuStage;
  config: IConfig;
}

export class WappuStack extends Stack {
  constructor(scope: App, id: string, props: WappuProps) {
    super(scope, id, props);
    const { stage, config } = props;

    const bucket = new s3.Bucket(
      this,
      `${config.PROJECT_NAME}-bundle-${stage}`,
      {
        encryption: s3.BucketEncryption.S3_MANAGED,
        accessControl: s3.BucketAccessControl.PRIVATE,
      }
    );

    const cspDirectives: string[][] = [
      ['default-src', "'self'"],
      ['connect-src', "'self'", 'https://gapi.storyblok.com'],
      ['font-src', "'self'", 'https:', 'data:'],
      ['style-src', "'self'", 'https:', "'unsafe-inline'"],
      ['upgrade-insecure-requests'],
      ['img-src', 'https:', 'data:'],
      ['object-src', "'none'"],
    ];

    const responseHeadersPolicy = new cloudfront.ResponseHeadersPolicy(
      this,
      `${config.PROJECT_NAME}-response-policy-${stage}`,
      {
        responseHeadersPolicyName: `${config.PROJECT_NAME}-response-policy-${stage}`,
        corsBehavior: {
          accessControlAllowCredentials: false,
          accessControlAllowHeaders: ['*'],
          accessControlAllowMethods: ['GET', 'POST'],
          accessControlAllowOrigins: ['*'],
          accessControlMaxAge: Duration.seconds(600),
          originOverride: true,
        },
        securityHeadersBehavior: {
          contentSecurityPolicy: {
            contentSecurityPolicy: cspDirectives
              .map((directives) => directives.join(' '))
              .join('; '),
            override: true,
          },
          contentTypeOptions: { override: true },
          frameOptions: {
            frameOption: cloudfront.HeadersFrameOption.DENY,
            override: true,
          },
          referrerPolicy: {
            referrerPolicy: cloudfront.HeadersReferrerPolicy.NO_REFERRER,
            override: true,
          },
          strictTransportSecurity: {
            accessControlMaxAge: Duration.seconds(31536000),
            includeSubdomains: true,
            override: true,
          },
          xssProtection: {
            protection: true,
            modeBlock: true,
            override: true,
          },
        },
      }
    );

    const originAccessIdentity = new cloudfront.OriginAccessIdentity(
      this,
      `${config.PROJECT_NAME}-bucket-oai-${stage}`
    );
    bucket.grantRead(originAccessIdentity);

    const distribution = new cloudfront.Distribution(
      this,
      `${config.PROJECT_NAME}-dist-${stage}`,
      {
        defaultRootObject: 'index.html',
        defaultBehavior: {
          origin: new origins.S3Origin(bucket, {
            originAccessIdentity,
          }),
          responseHeadersPolicy,
          viewerProtocolPolicy:
            cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        },
        errorResponses: [
          {
            httpStatus: 404,
            responseHttpStatus: 200,
            responsePagePath: '/index.html',
          },
        ],
      }
    );

    const deployment = new s3deploy.BucketDeployment(
      this,
      `${config.PROJECT_NAME}-deploy-${stage}`,
      {
        sources: [
          s3deploy.Source.asset(
            path.join(__dirname, '../../', config.BUNDLE_PATH)
          ),
        ],
        destinationBucket: bucket,
        storageClass: s3deploy.StorageClass.INTELLIGENT_TIERING,
        serverSideEncryption: s3deploy.ServerSideEncryption.AES_256,
        cacheControl: [
          s3deploy.CacheControl.setPublic(),
          s3deploy.CacheControl.maxAge(Duration.hours(1)),
        ],
        distribution,
      }
    );

    new CfnOutput(this, `${config.PROJECT_NAME}-url-${stage}`, {
      value: distribution.distributionDomainName,
      description: 'CDN url',
      exportName: `${config.PROJECT_NAME}-url-${stage}`,
    });
  }
}
