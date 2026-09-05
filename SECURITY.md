# Security policy

AIXS is currently an early research repository, not a production security product. We still want vulnerabilities and accidental exposure handled responsibly.

## Report privately when needed

Do not open a public issue containing:

- credentials, tokens or private endpoints;
- exploitable vulnerabilities in AIXS-hosted infrastructure;
- sensitive personal information;
- instructions that would make a live vulnerability materially easier to abuse before it is fixed.

Use GitHub's private security reporting feature when enabled. If it is unavailable, contact a repository maintainer privately.

## Scope

Ordinary bugs, benchmark mistakes, reproducibility problems and non-sensitive dependency issues can be reported through normal Issues.

Never commit secrets. Rotate any credential that has been pushed to Git, even if the commit is later removed.
