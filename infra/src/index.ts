import { App } from 'aws-cdk-lib';
import { z } from 'zod';
import { WappuStack, WappuStage } from './wappu-stack';

const configSchema = z.object({
  CDK_DEFAULT_REGION: z.string(),
  CDK_DEFAULT_ACCOUNT: z.string(),
  PROJECT_NAME: z.string().optional().default('suomensuurinwappu'),
  // Bundle folder path relative to project root
  BUNDLE_PATH: z.string().min(1),
});
export type IConfig = z.infer<typeof configSchema>;
const config = configSchema.parse(process.env);

const app = new App();

const devStack = new WappuStack(
  app,
  `${config.PROJECT_NAME}-stack-${WappuStage.DEV}`,
  {
    config,
    stage: WappuStage.DEV,
    env: {
      region: config.CDK_DEFAULT_REGION,
      account: config.CDK_DEFAULT_ACCOUNT,
    },
  }
);
