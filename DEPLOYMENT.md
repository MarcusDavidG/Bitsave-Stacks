# 🚀 BitSave Frontend Deployment Guide

## Quick Deployment to Vercel

### Prerequisites
- GitHub repository with your BitSave code
- Vercel account (free tier available)

### Step-by-Step Deployment

1. **Push your code to GitHub** (if not already done):
   ```bash
   git add .
   git commit -m "feat: redesigned frontend with modern UI"
   git push origin main
   ```

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - **Important**: Set the root directory to `frontend`
   - Click "Deploy"

3. **Configuration Settings**:
   ```
   Framework Preset: Next.js
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   Node.js Version: 18.x (or latest)
   ```

### Alternative: Using Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Deploy from frontend directory**:
   ```bash
   cd frontend
   vercel --prod
   ```

3. **Follow the prompts**:
   - Link to existing project or create new
   - Confirm settings
   - Deploy!

### Environment Variables (Optional)

If you need to add environment variables:

1. In Vercel dashboard → Project Settings → Environment Variables
2. Add variables like:
   ```
   NEXT_PUBLIC_STACKS_API_URL=https://api.testnet.hiro.so
   NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
   ```

### Custom Domain (Optional)

1. In Vercel dashboard → Project Settings → Domains
2. Add your custom domain
3. Configure DNS records as instructed

### Troubleshooting

**Build fails?**
- Ensure you're using the `frontend` directory as root
- Check that all dependencies are in package.json
- Verify the build works locally: `npm run build`

**Wallet connection issues?**
- Ensure HTTPS is enabled (Vercel provides this automatically)
- Check browser console for any errors
- Verify Stacks network configuration

### Success! 🎉

Your BitSave frontend should now be live at:
`https://your-project-name.vercel.app`

### Next Steps

1. **Test thoroughly**: Try all wallet connections and transactions
2. **Monitor**: Check Vercel analytics and logs
3. **Update**: Push new changes to auto-deploy
4. **Scale**: Upgrade Vercel plan if needed for higher traffic

### Support

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [Stacks.js Documentation](https://docs.stacks.co/stacks.js/)

---

**Pro Tip**: Vercel automatically deploys on every push to your main branch. Use preview deployments for testing by pushing to feature branches!
