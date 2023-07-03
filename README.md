List Client (GET):         http://154.49.137.28:8080/listClients

Save Client (POST):        http://154.49.137.28:8080/saveClient

{
    "mac":"EA:42:5F:84:C8:49",
    "nom":"Miband", 
    "prenom":"Miband ",    
    "tel":"+212654821598",  
    "adresse":"Rabat PO Box 60311",
    "mail":"miband5@gmail.com"
}



GetClientById (GET) :  		http://154.49.137.28:8080/getClientById/1



Update Client (PUT):		http://154.49.137.28:8080/updateClient/
{
     "mac": "EA:42:aF:94:C8:49",
        "nom": "qsdsqdsqdsq _ 1",
        "prenom": "acti",
        "tel": "+212",
        "adresse": "paris",
        "mail": "@gmail"
}


Delete Client (DELETE): 	http://154.49.137.28:8080/deleteClient/2


Add Hearbeat (POST): 		http://154.49.137.28:8080/addHeartbeatClient
{
    "mac":"EA:42:5F:94:C8:49",  
    "data1":"1000"  ,
    "data2":"2000",    
    "data3":"", 
    "data4":"",
    "date_prelevement":"2023-05-27 20:40:44.892"
    }



Get HeartBeat ByClient (GET) :	http://154.49.137.28:8080/getHeartbeatsByClient/1?pageNo=0&pageSize=5

