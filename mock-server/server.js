var express = require('express');
var app = express();
var port = 8080;

var cors = require('cors');
var bodyParser = require('body-parser')

app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use('/*', function (req, res, next) {
  res.header("authentication", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MDg0NzMzNzcsIm5hbWUiOiJ6aGFuZ3lvbmdfbmV3IiwidXNlcl9pZCI6MX0.1dc_hmifgwd0kDMdZXiPbO82wlbCwSHBj7dv07mz-xk");
  next();
})

app.get('/dashboard/clustercentre/clustermng/listclusters',function(req,res){
  var result =
    [{
      "Cluster_Id":1,
      "Cluster_Name":"test",
      "Config_Name":"test2",
      "Flavor":1,
      "Storage":32,
      "Replicas":2,
      "Create_At":"2017-09-27T11:09:08Z",
      "Valid":true
    },
    {
      "Cluster_Id":2,
      "Cluster_Name":"testcluster3",
      "Config_Name":"test2",
      "Flavor":2,
      "Storage":32,
      "Replicas":8,
      "Create_At":"2017-09-27T13:49:42Z",
      "Valid":true
    }];
  res.json(result);
});

app.get('/dashboard/imagecentre/myimages/newimage/basicimages',function(req,res){
  var result =
    [
      {
          "id": 1,
          "name": "fabric8/java-centos-openjdk8-jdk"
      },
      {
          "id": 2,
          "name": "centos/python-27-centos7"
      },
      {
          "id": 3,
          "name": "centos/ruby-22-centos7"
      },
      {
          "id": 4,
          "name": "centos/nodejs-4-centos7"
      }
      ,{
        "id": 5,
        "name": "fabric8/java-centos-openjdk8-jdk"
        },
        {
            "id": 6,
            "name": "centos/python-27-centos7"
        },
        {
            "id": 7,
            "name": "centos/ruby-22-centos7"
        },
        {
            "id": 8,
            "name": "centos/nodejs-4-centos7"
        }

        ,{
          "id": 9,
          "name": "fabric8/java-centos-openjdk8-jdk"
        },
        {
            "id": 10,
            "name": "centos/python-27-centos7"
        },
        {
            "id": 11,
            "name": "centos/ruby-22-centos7"
        },
        {
            "id": 12,
            "name": "centos/nodejs-4-centos7"
        }
    ]   
  res.json(result);
});

app.get('/dashboard/imagecentre/myimages/listimages',function(req,res){
  var result =
  [
    {
        "id": 1,
        "tenantid": 1,
        "name": "android_push_beta",
        "description": "android push service test image",
        "tag": "20170914.023946",
        "buildfrom": "alpine:3.5",
        "uploadfile": "/home/sean/temp/android_push.tar",
        "storepath": "/",
        "jobname": "1_android_push_beta_20170914.023946",
        "buildnumber": 1,
        "buildstatus": "BUILDING",
        "deployed": 0,
        "createdby": "TenantName",
        "createdat": "2017-09-14T02:39:48.881485759-04:00",
        "deleted": 0
    },
    {
      "id": 2,
      "tenantid": 1,
      "name": "android_push_beta",
      "description": "android push service test image",
      "tag": "20170914.023946",
      "buildfrom": "alpine:3.5",
      "uploadfile": "/home/sean/temp/android_push.tar",
      "storepath": "/",
      "jobname": "1_android_push_beta_20170914.023946",
      "buildnumber": 1,
      "buildstatus": "SUCCESS",
      "deployed": 0,
      "createdby": "TenantName",
      "createdat": "2017-09-14T02:39:48.881485759-04:00",
      "deleted": 0
    },
    {
      "id": 2,
      "tenantid": 1,
      "name": "android_push_beta",
      "description": "android push service test image",
      "tag": "20170914.023946",
      "buildfrom": "alpine:3.5",
      "uploadfile": "/home/sean/temp/android_push.tar",
      "storepath": "/",
      "jobname": "1_android_push_beta_20170914.023946",
      "buildnumber": 1,
      "buildstatus": "FAILURE",
      "deployed": 0,
      "createdby": "TenantName",
      "createdat": "2017-09-14T02:39:48.881485759-04:00",
      "deleted": 0
  },

  ]   
  res.json(result);
});

app.get('/dashboard/clustercentre/configmng/listconfigs',function(req,res){
  var result =
    [{
      "Row_ID":1,
      "User_ID":1,
      "Tenant_ID":1,
      "Config_Name":"test",
      "Config_Des":"testconfig2",
      "Create_At":"2017-09-27T11:09:04Z",
      "Create_By":"testuser",
      "Modified_At":"2017-09-27T13:08:26Z",
      "Modified_By":"test",
      "Valid":true
    },
      {
        "Row_ID":2,
        "User_ID":1,
        "Tenant_ID":1,
        "Config_Name":"test-selft",
        "Config_Des":"testconfig2",
        "Create_At":"2017-09-27T11:09:04Z",
        "Create_By":"testuser",
        "Modified_At":"2017-09-27T13:08:26Z",
        "Modified_By":"test",
        "Valid":true
      }];

  res.json(result);
});


//登录
app.post('/dashboard/usercentre/login',function(req, res){
  var result = {
      "code": 0,
      "detail": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MDg0NzMzNzcsIm5hbWUiOiJ6aGFuZ3lvbmdfbmV3IiwidXNlcl9pZCI6MX0.1dc_hmifgwd0kDMdZXiPbO82wlbCwSHBj7dv07mz-xk"
  }
  res.json(result);
})

//登出
app.post('/dashboard/usercentre/logout',function(req, res){
  var result = {
    "code": 0,
    "detail": "logout success"
  }
  res.json(result);
})

//创建新镜像
app.post('/dashboard/imagecentre/myimages/newimage/build',function(req, res){
  var result = {
    "code": 0,
    "detail": "build image started"
  }
  res.json(result);
})

//部署新集群
app.post('/dashboard/clustercentre/clustermng/newcluster/addcluster',function(req, res){
  var result = {
    "code": 0,
    "detail": "create new cluster success"
  }
  res.json(result);
})

//创建新配置
app.post('/dashboard/clustercentre/configmng/newconfig/addconfig',function(req, res){
  var result = {
    "code": 0,
    "detail": "create new config success"
  }
  res.json(result);
})

//查询配置
app.get('/dashboard/clustercentre/configmng/queryconfig',function(req, res){
  var result = {
    "configfiles": [
      {
      "Config_File": "/conf/app.conf",
      "Config_Data": "appname = dashboardservice\\nhttpport = 8089"
      }
    ],
    "envlist": [
      {
      "ENV_Key": "JAVA_HOME",
      "ENV_Val": "/Java/jdk1.8.0_60"
      },
      {
      "ENV_Key": "CLASSPATH",
      "ENV_Val": "%/JAVA_HOME%/lib"
      }
    ]
    }
    res.json(result);
})

//查询集群
app.get('/dashboard/clustercentre/clustermng/querycluster', function(req, res){
  var result = {
    "App_ID":2,
    "App_Name":"testcluster",
    "App_Des":"testcluster3",
    "User_ID":1,
    "Tenant_ID":1,
    "ENV_ID":1,
    "Image_ID":1,
    "Image_Name":"test",
    "Image_Url":"/",
    "Config_ID":1,
    "Flavor":2,
    "Storage":32,
    "Persistent":true,
    "Replicas":8,
    "CMD":"/",
    "Create_At":"2017-09-27T13:49:42Z",
    "Create_By":"test",
    "Modified_At":"2017-09-27T13:49:42Z",
    "Modified_By":"test",
    "Valid":true    
  }
  res.json(result);
})

//查询镜像
app.get('/dashboard/imagecentre/myimages/status', function(req, res){
  var result = {
    "id": 13,
    "tenantid": 1,
    "name": "android_push_beta",
    "description": "android push service test image",
    "tag": "20170914.023946",
    "buildfrom": "alpine:3.5",
    "uploadfile": "/home/sean/temp/android_push.tar",
    "storepath": "/",
    "jobname": "1_android_push_beta_20170914.023946",
    "buildnumber": 1,
    "buildstatus": "BUILDING",
    "deployed": 0,
    "createdby": "TenantName",
    "createdat": "2017-09-14T02:39:48.881485759-04:00",
    "deleted": 0
  };
  res.json(result);
})

//删除配置
app.get('/dashboard/clustercentre/configmng/deleteconfig', function(req, res){
  var result = {
    "code": 0,    
    "detail": "delete config success"   
  }
  res.json(result);
})

//修改配置
app.post('/dashboard/clustercentre/configmng/modifyconfig', function(req, res){
  var result = {
    "code": 0,  
    "detail": "modify config success"   
  }
  res.json(result);
})
//集群删除
app.get('/dashboard/clustercentre/clustermng/deletecluster', function(req, res){
  var result = {
    "code": 0,    
    "detail": "delete cluster success"   
  }
  res.json(result);
})

//获取所有副本
app.get('/dashboard/clustercentre/clustermng/listpods', function(req, res){
  var result = [
    {
      "podip": "",
      "podname": "test-web-3119570437-5xd0r",
      "starttime": "2017-11-01T10:58:46Z",
      "status": "Failed"
    },
    {
        "podip": "121.93.47.27",
        "podname": "test-web-3119570437-8yugf",
        "starttime": "2017-11-01T10:58:42Z",
        "status": "Running"
    }
  ]
  res.json(result);
})

//查看副本日志
app.get('/dashboard/clustercentre/clustermng/podlogs', function(req, res){
  var result ={
    "log":"1:M 01 Nov 23:13:27.770 # WARNING: The TCP backlog setting of 511 cannot be enforced because /proc/sys/net/core/somaxconn is set to the lower value of 128."
  }
  res.json(result);
})

//获取用户列表
app.get('/dashboard/usercentre/listuser', function(req, res){
  var result = [
    {
    "id":"1",
    "name":"test",    
    "password":"123456",
    "email":"test@honeywell.com",    
    "telphone":"13812345678"        
    },
    {
    "id":"2",
    "name":"test2",    
    "password":"123456",
    "email":"test2@honeywell.com",    
    "telphone":"13888888888"        
    }
    ];
    res.json(result);
})

//添加用户
app.post('/dashboard/usercentre/registeruser', function(req, res){
  var result = {
    "code": 0,  
    "detail": "register success"    
  }
  res.json(result);
})

//修改用户
app.post('/dashboard/usercentre/modifyuser', function(req, res){
  var result = {
    "code": 0,  
    "detail": "modify success"  
  }
  res.json(result);
})

//删除用户
app.get('/dashboard/usercentre/deleteuser', function(req, res){
  var result = {
    "code": 0,  
    "detail": "delete success"  
  }
  res.json(result);
})

//获取应用价格信息
app.post('/dashboard/clustercentre/clustermng/newcluster/clusterprice', function(req, res){
  var result = {
    "code": 0,    
    "detail": "VM price is  RMB-8.33/Hour"  
  }
  res.json(result);
})

//添加角色
app.post('/dashboard/usercentre/registerrole', function(req, res){
  var result = {
    "code": 0,    
    "detail": "register success"    
  }
  res.json(result);
})

//修改角色
app.post('/dashboard/usercentre/modifyrole', function(req, res){
  var result = {
    "code": 0,    
    "detail": "modify success"    
  }
  res.json(result);
})

//删除角色
app.post('/dashboard/usercentre/deleterole', function(req, res){
  var result = {
    "code": 0,    
    "detail": "delete success"    
  }
  res.json(result);
})

//获取角色列表
app.get('/dashboard/usercentre/listrole', function(req, res){
  var result = [
    {
        "id":"1",
        "name":"test",    
        "description":"testrole",
        "permission": {
            "CICD": "read",
            "ClusterConfiguration": "read",
            "Cluster": "read"
        }       
    },
    {
        "id":"2",
        "name":"test2",    
        "description":"test2role",
        "permission": {
            "CICD": "read",
            "ClusterConfiguration": "read",
            "Cluster": "read"
        }       
    }
  ]
  res.json(result);
})

//修改应用
app.post('/dashboard/clustercentre/clustermng/modifycluster', function(req,res){
  var result = {
    "code": 0,  
    "detail": "modify cluster success"  
  }
  res.json(result);
})
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(errorHandler);

function errorHandler(err, req, res, next) {
  var error = {
    errorCode: "500",
    errorMessage: "call api error"
  }
  res.status(500);
  res.json(error);
}

app.listen(port, function () {
  console.log('server start, listen on port ' + port);
});
