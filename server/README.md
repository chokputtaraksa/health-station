

| Method  | Path | Header | Usage |
| ------------- | ------------- |-------------------------------|--------------------------------------------------|
| POST | \<serverURL:port\>/api/data/save/  |  | To save health data to MongoDB |
| GET  | \<serverURL:port\>/api/data/allLatest/  |  | To get latest data of all health data types |
| GET  | \<serverURL:port\>/api/data/period/ |  | To get healtdata between 2 period of time |
| GET  | \<serverURL:port\>/api/data/latest/ |  | To get latest data of 1 type of health data |
| POST | \<serverURL:port\>/api/auth/register/ |  | To register user to system |
| GET  | \<serverURL:port\>/api/auth/login/ |  | To check if this user'd already registered in system |
| GET  | \<serverURL:port\>/api/auth/protected/ |  | To check JWT token if expired or not |
