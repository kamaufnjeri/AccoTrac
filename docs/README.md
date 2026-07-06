# AccoTrac Documentation

This directory contains in-depth technical documentation for the AccoTrac project. The main [README](../README.md) provides a high-level overview; everything here dives deeper.

---

## Contents

###  Architecture
| File | Description |
|---|---|
| [`architecture/system_overview.md`](architecture/system_overview.md) | High-level component diagram (frontend ↔ backend ↔ database) |
| [`architecture/application_flow.md`](architecture/application_flow.md) | User journey sequence diagrams — registration, login, transaction recording |
| [`architecture/database_schema.md`](architecture/database_schema.md) | Entity-Relationship Diagram and table descriptions |

###  Deployment
| File | Description |
|---|---|
| [`deployment/hosting.md`](deployment/hosting.md) | Hosting platform, server config, static file serving |
| [`deployment/deployment_architecture.md`](deployment/deployment_architecture.md) | Deployment architecture diagram |
| [`deployment/environment_variables.md`](deployment/environment_variables.md) | All required environment variables and their purpose |
| [`deployment/ci_cd.md`](deployment/ci_cd.md) | CI/CD current state and recommended pipeline |

###  API
| File | Description |
|---|---|
| [`api/api_reference.md`](api/api_reference.md) | Full REST API reference for all endpoints |

###  Security
| File | Description |
|---|---|
| [`security/security_considerations.md`](security/security_considerations.md) | Auth, sessions, CORS, password hashing, email tokens |

###  Scalability
| File | Description |
|---|---|
| [`scalability/scalability_considerations.md`](scalability/scalability_considerations.md) | Current constraints and recommended growth path |

###  Retrospective
| File | Description |
|---|---|
| [`lessons_learned.md`](lessons_learned.md) | Technical decisions, challenges, and what we'd do differently |
