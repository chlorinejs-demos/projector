(def servicesModule (.. angular (module "myApp.services" [])))

(.. servicesModule
    (factory
     "Storage"
     (fn []
       (def newServiceInstance {})
       (defn newServiceInstance.loadObject
         [key]
         (def data [])
         (def json_object (get localStorage key))
         (if json_object (set! data (.. JSON (parse json_object))))
         data)
       (defn newServiceInstance.clear
         [] (.. localStorage clear))
       (defn newServiceInstance.supported
         []
         (and
          (contains? window "localStorage")
          (not= (get window :localStorage) nil)))
       (defn newServiceInstance.saveObject
         [objectToSave key]
         (set! (get localStorage key) (.. JSON (stringify objectToSave))))
       newServiceInstance)))
