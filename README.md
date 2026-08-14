# Signature-villa-landing-page

## Hostinger deploy

Source changes go to the `main` branch. A GitHub Actions workflow builds the
Next static export with the CRM API URL and publishes the generated `out/`
files to the `hostinger` branch.

Hostinger should redeploy from the `hostinger` branch. After pushing changes to
`main`, wait for the GitHub Action to finish, then click Redeploy in Hostinger.
