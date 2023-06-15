pour lister tous les clients :
methode GET  http://181.215.68.171:8080/mibandbackend/listClients

# **pour ajouter un client :
**methode POST http://181.215.68.171:8080/mibandbackend/saveClient
     format du body :
       {
    "mac":"EA:42:5F:94:C8:49",
    "nom":"Miband", 
    "prenom":"Miband 5",    
    "tel":"+212654821598",  
    "adresse":"Rabat PO Box 60311",
    "mail":"miband5@gmail.com"
     }


# **pour chercher un client par son ID
**  methode GET http://181.215.68.171:8080/mibandbackend/getClientById/2

# **pour mettre à jour un client par son ID
** methode PUT http://181.215.68.171:8080/mibandbackend/updateClient/1
     format du body :
{
     "mac": "01:AA:BB:EE:FF:00:A9",
        "nom": "badr _ 1",
        "prenom": "acti",
        "tel": "+212",
        "adresse": "paris",
        "mail": "@gmail"
}


# **pour supprimer un client par son ID
** methode DELETE http://181.215.68.171:8080/mibandbackend/deleteClient/1


# **pour rechercher les heartbeats d'un client par son ID
methode GET  
http://181.215.68.171:8080/mibandbackend/getHeartbeatsByClient/2?pageNo=0&pageSize=2  

# **pour ajouter les heartbeats d'un client (via miband ou bien manuel) :
methode POST http://181.215.68.171:8080/mibandbackend/addHeartbeatClient
    {
    "mac":"EA:42:5F:94:C8:49",  
    "data1":"9999"  ,
    "data2":"11111",    
    "data3":"", 
    "data4":"",
    "date_prelevement":"2023-05-27 20:40:44.892"
    }

Merci de consulter ces ressources au préalable afin que notre point soit productif.
