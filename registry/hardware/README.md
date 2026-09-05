# Hardware registry

AIXS contributors will not all own the same hardware. The registry captures heterogeneous machines precisely enough to interpret and reproduce experiments.

Profiles describe **what a machine is**. An experiment separately records whether that machine is being used as `reference`, `exploratory`, or `replication` hardware.

## Add a profile

1. Copy [`templates/hardware-profile.yaml`](templates/hardware-profile.yaml).
2. Give the file a stable, non-sensitive identifier such as `m2-max-64gb-01.yaml`.
3. Fill in exact technical details where known.
4. Do not include serial numbers, private hostnames, MAC addresses, account IDs or other unnecessary identifiers.
5. Reference the profile path from `experiment.yaml`.

An optional contributor field can identify a maintainer when useful; Git history remains the canonical attribution record.
