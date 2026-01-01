# Setup Instructions

## 1. Configure the UiPath Workflow & Orchestrator
You mentioned you have already created the **Credential Asset** in Orchestrator (`SaaS_ApiKey`).
*   **Important**: The value you entered in the "Password" field of that asset is your **Shared Secret**.
*   Let's assume this secret is: `MySuperSecretKey123` (Use your actual one).

## 2. Configure this Website
To securely connect to your workflow, we need to set environment variables.

1.  **Duplicate the example file**:
    Rename `.env.local.example` to `.env.local`.

2.  **Fill in the values**:
    *   `UIPATH_WORKFLOW_URL`: The public URL of your UiPath Workflow (e.g., from Integration Service triggers or Orchestrator Webhooks).
    *   `UIPATH_SECRET_KEY`: The **same value** you stored in the Orchestrator Asset `SaaS_ApiKey`.

    **Why?**
    The website will send this key to the workflow. The workflow will retrieve the key from Orchestrator and compare them. If they match, the email is sent.

## 3. Deployment to Vercel
1.  Push this code to a GitHub repository.
2.  Go to [Vercel](https://vercel.com) and "Add New Project".
3.  Import your GitHub repository.
4.  **Environment Variables**: In the Vercel project configuration, add the same variables:
    *   `UIPATH_WORKFLOW_URL`
    *   `UIPATH_SECRET_KEY`
5.  Click **Deploy**.
