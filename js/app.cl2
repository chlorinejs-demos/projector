(import! [:private "boot.cl2"])
(include-core!)

(..
 angular
 (module "myApp" ["myApp.services"]))

(include! "./services.cl2")
(include! "./controllers.cl2")