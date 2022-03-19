# suomensuurinwappu.fi

First, copy example environment variables and add missing ones:

```
cp .env.example .env.local
```

Storyblok token can be found from **Settings** / **API-Keys** from the Storyblok UI—it's the one with that **preview** label.

Then just install packages and start the app:

```
cd client
npm ci
npm start
```

## Deployment
Pushes to `main` branch will trigger an automatic deployment to development environment.

## Architecture
Built client is stored in S3 bucket and served through CloudFront. Thats it.