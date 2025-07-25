# GitHub Workflows Documentation

This document describes the CI/CD workflows for the VeriLuxe dApp repository.

## 🔄 Workflows Overview

### 1. Frontend CI (`frontend-ci.yml`)
**Triggers:** Push/PR to `main`/`develop` with changes in `/frontend/**`

**Jobs:**
- **Lint**: ESLint, TypeScript, Prettier checks
- **Test**: Unit tests with coverage
- **E2E**: Playwright end-to-end tests
- **Build**: Multi-environment builds
- **Lighthouse**: Performance auditing
- **Security**: Vulnerability scanning
- **Bundle Analysis**: Size optimization
- **Accessibility**: a11y testing

### 2. Frontend Deployment (`deploy-frontend.yml`)
**Triggers:**
- Push to `main`
- Manual workflow dispatch
- Git tags (`v*`)

**Jobs:**
- **Vercel Deploy**: Production deployment to Vercel
- **Netlify Deploy**: Staging deployment to Netlify
- **AWS S3 Deploy**: Production deployment to S3 + CloudFront
- **Smoke Tests**: Post-deployment validation

### 3. Security Scans (`security.yml`)
**Triggers:**
- Weekly schedule
- Push to `main`
- Pull requests

**Jobs:**
- **Dependency Scan**: npm audit, Snyk scanning
- **CodeQL**: Static analysis
- **Semgrep**: Security pattern detection
- **Secret Scan**: TruffleHog secret detection
- **Container Scan**: Trivy vulnerability scanning
- **Security Scorecard**: OSSF scorecard

### 4. Performance Monitoring (`performance.yml`)
**Triggers:**
- Push/PR to `main`
- Every 6 hours schedule
- Manual dispatch

**Jobs:**
- **Lighthouse**: Performance auditing
- **Web Vitals**: Core metrics monitoring
- **Bundle Size**: Size regression testing
- **Visual Regression**: UI consistency checks
- **Performance Monitoring**: Metrics collection

## 🔧 Required Secrets

### Deployment Platforms
- `VERCEL_TOKEN`: Vercel deployment token
- `VERCEL_ORG_ID`: Vercel organization ID
- `VERCEL_PROJECT_ID`: Vercel project ID
- `NETLIFY_AUTH_TOKEN`: Netlify authentication token
- `NETLIFY_SITE_ID`: Netlify site ID

### AWS (for S3 deployment)
- `AWS_ACCESS_KEY_ID`: AWS access key
- `AWS_SECRET_ACCESS_KEY`: AWS secret key
- `AWS_REGION`: AWS region
- `AWS_S3_BUCKET`: S3 bucket name
- `AWS_CLOUDFRONT_DISTRIBUTION_ID`: CloudFront distribution ID

### API Configuration
- `STAGING_API_URL`: Staging API endpoint
- `PRODUCTION_API_URL`: Production API endpoint
- `STAGING_CONTRACT_ID`: Staging contract ID
- `PRODUCTION_CONTRACT_ID`: Production contract ID

### Security & Monitoring
- `SNYK_TOKEN`: Snyk security scanning token
- `LHCI_GITHUB_APP_TOKEN`: Lighthouse CI token
- `MONITORING_WEBHOOK_URL`: Performance monitoring webhook
- `MONITORING_API_KEY`: Monitoring service API key
- `SLACK_WEBHOOK`: Slack notifications webhook

## 🏗️ Build Process

### Development Build
1. **Dependencies**: npm ci with caching
2. **Linting**: ESLint + TypeScript + Prettier
3. **Testing**: Jest unit tests with coverage
4. **Building**: Next.js build with optimizations

### Production Build
1. **Environment Setup**: Production environment variables
2. **Dependencies**: Production-only packages
3. **Building**: Optimized production build
4. **Static Export**: Static site generation
5. **Asset Optimization**: Image and bundle optimization

## 🚀 Deployment Strategies

### Multi-Platform Deployment

**Vercel (Primary Production):**
- Automatic deployments from `main`
- Preview deployments for PRs
- Edge functions support
- Global CDN

**Netlify (Staging):**
- Staging environment testing
- Branch previews
- Form handling
- Edge functions

**AWS S3 + CloudFront (Backup Production):**
- Static site hosting
- Global content delivery
- Custom domain support
- Cache invalidation

### Environment Configuration

**Development:**
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_STELLAR_NETWORK=testnet
NEXT_PUBLIC_CONTRACT_ID=test_contract
```

**Staging:**
```env
NEXT_PUBLIC_API_URL=https://api-staging.veriluxe.com
NEXT_PUBLIC_STELLAR_NETWORK=testnet
NEXT_PUBLIC_CONTRACT_ID=CXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

**Production:**
```env
NEXT_PUBLIC_API_URL=https://api.veriluxe.com
NEXT_PUBLIC_STELLAR_NETWORK=mainnet
NEXT_PUBLIC_CONTRACT_ID=CXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

## 🔒 Security Pipeline

### Static Analysis
- **ESLint Security**: Security-focused linting rules
- **CodeQL**: GitHub's semantic code analysis
- **Semgrep**: Custom security rules
- **Dependency Scanning**: Automated vulnerability detection

### Runtime Security
- **Container Scanning**: Trivy vulnerability assessment
- **Secret Detection**: TruffleHog secret scanning
- **OSSF Scorecard**: Open source security metrics

### Security Best Practices
- No secrets in code
- Dependency pinning
- Regular security updates
- CSP headers implementation

## 📊 Performance Monitoring

### Core Web Vitals
- **LCP**: Largest Contentful Paint
- **FID**: First Input Delay
- **CLS**: Cumulative Layout Shift
- **FCP**: First Contentful Paint
- **TTI**: Time to Interactive

### Performance Budgets
```json
{
  "budgets": [
    {
      "path": "/**",
      "timings": [
        {
          "metric": "interactive",
          "budget": 3000
        },
        {
          "metric": "first-meaningful-paint",
          "budget": 2000
        }
      ]
    }
  ]
}
```

### Bundle Size Limits
```json
{
  "files": [
    {
      "path": ".next/static/chunks/*.js",
      "maxSize": "244 kB"
    },
    {
      "path": ".next/static/css/*.css",
      "maxSize": "10 kB"
    }
  ]
}
```

## 🧪 Testing Strategy

### Unit Testing
- **Framework**: Jest + React Testing Library
- **Coverage**: >90% target
- **Mock Strategy**: API mocking with MSW

### Integration Testing
- **Framework**: Playwright
- **Browsers**: Chromium, Firefox, Safari
- **Test Types**: User flows, API integration

### E2E Testing
- **Scenarios**: Critical user journeys
- **Data**: Test fixtures and factories
- **Environments**: Staging environment testing

### Visual Regression Testing
- **Tool**: Playwright screenshots
- **Coverage**: Key pages and components
- **Threshold**: 0.2% pixel difference

## 🔧 Development Workflow

### Pull Request Process
1. **Feature Branch**: Create from `develop`
2. **Development**: Local development and testing
3. **CI Checks**: All workflows must pass
4. **Review**: Code review required
5. **Merge**: Squash and merge to `develop`
6. **Release**: Merge `develop` to `main` for deployment

### Quality Gates
- All tests pass (unit + e2e)
- Code coverage >90%
- No security vulnerabilities
- Performance budget met
- Accessibility compliance
- Bundle size within limits

## 🐛 Troubleshooting

### Common Issues

**Build Failures:**
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

**Test Failures:**
```bash
# Run tests with debugging
npm run test -- --verbose --no-cache
```

**Playwright Issues:**
```bash
# Update browsers
npx playwright install --with-deps
```

### Debug Commands

**Local Development:**
```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Production server
npm run lint         # Linting
npm run test         # Unit tests
npm run test:e2e     # E2E tests
```

**Performance Analysis:**
```bash
npm run analyze      # Bundle analysis
npm run lighthouse   # Performance audit
```

## 📈 Monitoring & Alerts

### Performance Alerts
- Lighthouse score drops below 90
- Bundle size increases >10%
- Core Web Vitals regression

### Error Monitoring
- Runtime error tracking
- API error monitoring
- User session recording

### Deployment Monitoring
- Deployment success/failure
- Performance regression alerts
- Security vulnerability alerts

## 🔄 Maintenance

### Daily Tasks
- Monitor build status
- Review performance metrics
- Check error rates

### Weekly Tasks
- Dependency updates review
- Security scan results
- Performance trend analysis

### Monthly Tasks
- Workflow optimization
- Tool updates
- Performance budget review