

| Method  | Path | Header | Usage |
| ------------- | ------------- |-------------------------------|--------------------------------------------------|
| POST | \<serverURL:port\>/api/data/save/  | user_id | To save health data to MongoDB |
| GET  | \<serverURL:port\>/api/data/allLatest/  | user_id | To get latest data of all health data types |
| GET  | \<serverURL:port\>/api/data/period/ | user_id<br/> period<br/> type | To get healtdata between 2 period of time |
| GET  | \<serverURL:port\>/api/data/latest/ | user_id<br/> type | To get latest data of 1 type of health data |
| POST | \<serverURL:port\>/api/auth/register/ |  | To register user to system |
| GET  | \<serverURL:port\>/api/auth/login/ | Autherization:BasicAuth | To check if this user'd already registered in system |
| GET  | \<serverURL:port\>/api/auth/protected/ | Authorization:JWT_token | To check JWT token if expired or not |
