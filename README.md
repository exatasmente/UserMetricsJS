# User Metrics 

User metrics é uma api de propósito geral para armazenamento de métricas de aplicações web 
# How to Use
 - Add usermetrics in HTML
 ```<script src="../userMetrics.js"></script>```


 - Instantiate userMetrics sending urlServer database api
     ```html
    <script>
    var metrics = new UserMetrics(<urlServer>);
    </script> 
    ```
  - Start the Metrics sending the actual page name and the user Object
       ```html
    <script>
    ...
    metrics.startMetrics("Home",{username:"user",
                                email :"email@mail.com",
                                id:1});
    </script> 
    ```
- Stop the metrics sending de meta data to be stored
    ```html
    <script>
    ...
    metrics.stopMetrics({metaData1 : 1, 
                        metaData2 : "Some String", 
                        metaData3 : false});
    </script>
    ```
- Sending metrics to server api database
  ```html
    <script>
    ...
    metrics.postMetrics().then(
            function(rep){
                console.log(rep)
            },function(err){
                console.log(err)
            });
    </script>
    ```
