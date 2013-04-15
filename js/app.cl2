(include! "../node_modules/angular-cl2/lib/angular.cl2")

(defmodule (myApp [])
  (:controller
   (projectorCtrl
    [$scope Storage]
    (def$ startBalance
      (.. Storage (loadObject "startBalance")))
    (def$ expenses (.. Storage (loadObject "expenses")))
    (def$ incomes (.. Storage (loadObject "incomes")))
    (def$ nonRecurring
      (.. Storage (loadObject "nonRecurring")))
    (def$ storageSupport (.. Storage supported))
    (defn$ save
      []
      (.. Storage (saveObject (-> $scope :expenses) "expenses"))
      (.. Storage (saveObject (-> $scope :incomes) "incomes"))
      (.. Storage (saveObject (-> $scope :startBalance) "startBalance"))
      (.. Storage (saveObject (-> $scope :nonRecurring) "nonRecurring")))
    (defn$ clear
      []
      (.. Storage clear)
      (set! (-> $scope :startBalance) [])
      (set! (-> $scope :expenses) [])
      (set! (-> $scope :incomes) [])
      (set! (-> $scope :nonRecurring) [])
      (.. $scope initForm))
    (defn$ addExpense
      []
      (def newEmptyExpense
        {:frequency 1, :amount 0, :name "", :active true})
      (.. (-> $scope :expenses) (push newEmptyExpense)))
    (defn$
      removeExpense
      [index]
      (.. (-> $scope :expenses) (splice index 1)))
    (defn$ addIncome
      []
      (def
        newEmptyIncome
        {:frequency 1, :amount 0, :name "", :active true})
      (.. (-> $scope :incomes) (push newEmptyIncome)))
    (defn$ removeIncome
      [index]
      (.. (-> $scope :incomes) (splice index 1)))
    (defn$ addTransaction
      []
      (def newEmptyTransaction
        {:month 1, :amount 0, :name "", :active true})
      (.. (-> $scope :nonRecurring) (push newEmptyTransaction)))
    (defn$ removeTransaction
      [index]
      (.. (-> $scope :nonRecurring) (splice index 1)))
    (defn$ tallyTransactions
      []
      (def total 0)
      (def oneOff 0)
      (doseq [non-recurring $scope.nonRecurring]
        (set! oneOff
              (..
               $scope
               (convertToNumber (:amount non-recurring))))
        (if (not= oneOff 0)
          (if (:active non-recurring)
            (set! total (+ total oneOff)))))
      total)
    (defn$ monthlyIncome
      []
      (def total 0)
      (def thisMonth nil)
      (doseq [income $scope.incomes]
        (set! thisMonth
              (.. $scope
                  (convertToNumber (:amount income))))
        (if (not= thisMonth 0)
          (if (:active income)
            (set! total
                  (+ total
                     (* thisMonth (:frequency income)))))))
      total)
    (defn$ monthlyExpense
      []
      (def total 0)
      (def thisMonth nil)
      (doseq [expense $scope.expenses]
        (set! thisMonth
              (..
               $scope
               (convertToNumber (:amount expense))))
        (if (not= thisMonth 0)
          (if (get expense :active)
            (set! total
                  (+ total
                     (* thisMonth (:frequency expense)))))))
      total)
    (defn$ monthlyNet
      []
      (def income (.. $scope monthlyIncome))
      (def expense (.. $scope monthlyExpense))
      (- income expense))
    (defn$ montlyProjection
      []
      (def monthByMonth [])
      (def runningTotal 0)
      (def oneOff 0)
      (doseq [i (range 12)]
        (set! runningTotal (+ runningTotal (.. $scope monthlyNet)))
        (doseq [non-recurring $scope.nonRecurring]
          (when (== (.. $scope
                        (convertToNumber (:month non-recurring)))
                    (+ i 1))
            (set! oneOff
                  (.. $scope
                      (convertToNumber (:amount non-recurring))))
            (if (not= oneOff 0)
              (if (:active non-recurring)
                (set! runningTotal (+ runningTotal oneOff))))))
        (set! (get monthByMonth i) runningTotal))
      monthByMonth)
    (defn$ getMonthLabel
      [monthAhead]
      (def d (new Date))
      (def currentMonth (.. d getMonth))
      (def year (.. d getFullYear))
      (def monthNames
        ["January"
         "February"
         "March"
         "April"
         "May"
         "June"
         "July"
         "August"
         "September"
         "October"
         "November"
         "December"])
      (def futureMonth (+ currentMonth monthAhead))
      (if (> futureMonth 11)
        (do
          (set! futureMonth (- futureMonth 12))
          (set! year (+ year 1))))
      (+ (get monthNames futureMonth) " " year))
    (defn$ positiveNegative
      [value]
      (if (> value 0) "positive")
      (if (< value 0) "negative"))
    (defn$ convertToNumber
      [value]
      (or (parseFloat value) 0))
    (defn$ roundDown [number] (.. Math (round number)))
    (defn$ initForm
      []
      (if (< (count $scope.incomes) 1) (.. $scope addIncome))
      (if (< (count $scope.expenses) 1) (.. $scope addExpense))
      (if (< (count $scope.nonRecurring) 1)
        (.. $scope addTransaction)))
    (.. $scope initForm)))
  (:service
   (Storage
    []
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