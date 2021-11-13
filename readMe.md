# Digicogs Backend

## Digicogs Server Setup

- Launch nano instance with digicogs-api security group	SSH - home IP
```
Custom TCP - 3000
HTTPS - 443
```

- Create Elastic IP & make record A in domain - add IP as target

- SSH into instance	

```
ssh -i ~/Desktop/keys/instance.pem ec2-user@PUBLIC_IPV4_DNS_ADDRESS
```

- Install Node	
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash

. ~/.nvm/nvm.sh

nvm install node

nvm install node 16.5

nvm use 16.5

node -e "console.log('Running Node.js ' + process.version)"
```

- Install GIT
```
sudo yum update -y
sudo yum install git -y
```

- Install Amazon-Linux-extras
```
sudo yum install amazon-linux-extras -y
```

- Clone backend repo & install packages
```
git clone https://github.com/tomdmitchell/digicogs-backend.git

cd digicogs-backend

npm install 
```

- Create .env file and set environment
```
touch .env
vim .env
```

- Install NGINX
```
sudo amazon-linux-extras install nginx1 -y
```
- Start NGINX
```
sudo service nginx start
sudo service nginx status
```
- Edit NGINX Config File
```
cd ../../etc/nginx

sudo vim nginx.conf

(edit so proxy 3000 port - see doc in misc)

sudo ln -s /etc/nginx/sites-available/digicogs.co.uk
```

- Install PM2
```
npm install pm2@latest -g
pm2 start index.js
(pm2 stop 0, pm2 restart 0, pm2 logs 0, pm2 logs)
```


- Install certbot & get certificate
```
sudo amazon-linux-extras install epel

sudo yum install certbot certbot-nginx

sudo certbot —nginx
```
	
	
