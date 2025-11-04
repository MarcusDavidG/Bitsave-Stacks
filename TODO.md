# TODO: Setup Next.js Frontend with Shadcn UI

## Step 1: Create frontend folder and initialize Next.js project
- [x] Create 'frontend' directory
- [x] Run `npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --yes` in the frontend directory (automate with --yes if possible, or handle interactively)

## Step 2: Install core dependencies sequentially
- [x] Install Next.js dependencies (already done in init)
- [x] Install Shadcn UI: `npx shadcn@latest init --yes`
- [x] Install additional packages: `npm install @stacks/connect framer-motion react-hook-form @hookform/resolvers zod next-themes lucide-react`

## Step 3: Set up Shadcn UI components
- [x] Add necessary Shadcn components: button, card, form, input, label, badge, dialog, sheet, progress

## Step 4: Configure theme and color scheme
- [x] Customize Shadcn theme for web3 colors (dark blues/purples with neon accents)
- [x] Set up light/dark mode with next-themes

## Step 5: Create layout and global styles
- [x] Create root layout with theme provider
- [x] Add global CSS for animations and web3 styling

## Step 6: Implement wallet connection component
- [x] Create WalletConnect component using @stacks/connect

## Step 7: Create deposit/withdraw forms
- [x] Build forms using react-hook-form and Shadcn components
- [x] Add validation with zod

## Step 8: Build reputation dashboard
- [x] Create dashboard component with charts/progress bars (use Shadcn progress)

## Step 9: Implement badge display
- [x] Create Badge component and display list/grid

## Step 10: Add animations and interactivity
- [x] Use framer-motion for transitions, button animations, etc.
- [x] Ensure smooth interactions

## Step 11: Integrate all components into main pages
- [x] Create home page with all features
- [x] Add routing if needed

## Step 12: Test and refine
- [x] Run the app locally
- Check light/dark mode toggle
- Verify animations and responsiveness
