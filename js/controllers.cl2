(defn projectorCtrl
  [$scope Storage]
  (set! (-> $scope :startBalance)
        (.. Storage (loadObject "startBalance")))
  (set! (-> $scope :expenses) (.. Storage (loadObject "expenses")))
  (set! (-> $scope :incomes) (.. Storage (loadObject "incomes")))
  (set! (-> $scope :nonRecurring)
        (.. Storage (loadObject "nonRecurring")))
  (set! (-> $scope :storageSupport) (.. Storage supported))
  (defn $scope.save
    []
    (.. Storage (saveObject (-> $scope :expenses) "expenses"))
    (.. Storage (saveObject (-> $scope :incomes) "incomes"))
    (.. Storage (saveObject (-> $scope :startBalance) "startBalance"))
    (.. Storage (saveObject (-> $scope :nonRecurring) "nonRecurring")))
  (defn $scope.clear
    []
    (.. Storage clear)
    (set! (-> $scope :startBalance) [])
    (set! (-> $scope :expenses) [])
    (set! (-> $scope :incomes) [])
    (set! (-> $scope :nonRecurring) [])
    (.. $scope initForm))
  (defn $scope.addExpense
    []
    (def newEmptyExpense
      {:frequency 1, :amount 0, :name "", :active true})
    (.. (-> $scope :expenses) (push newEmptyExpense)))
  (defn
    $scope.removeExpense
    [index]
    (.. (-> $scope :expenses) (splice index 1)))
  (defn
    $scope.addIncome
    []
    (def
      newEmptyIncome
      {:frequency 1, :amount 0, :name "", :active true})
    (.. (-> $scope :incomes) (push newEmptyIncome)))
  (defn $scope.removeIncome
    [index]
    (.. (-> $scope :incomes) (splice index 1)))
  (defn $scope.addTransaction
    []
    (def newEmptyTransaction
      {:month 1, :amount 0, :name "", :active true})
    (.. (-> $scope :nonRecurring) (push newEmptyTransaction)))
  (defn $scope.removeTransaction
    [index]
    (.. (-> $scope :nonRecurring) (splice index 1)))
  (defn $scope.tallyTransactions
    []
    (def total 0)
    (def oneOff 0)
    (dofor
     [(def m 0)
      (< m (count  $scope.nonRecurring))
      (inc-after! m)]
     (do
       (set! oneOff
             (..
              $scope
              (convertToNumber (:amount (get $scope.nonRecurring m)))))
       (if (not= oneOff 0)
         (if (:active (get $scope.nonRecurring m))
           (set! total (+ total oneOff))))))
    total)
  (defn $scope.monthlyIncome
    []
    (def total 0)
    (def thisMonth nil)
    (dofor
     [(def i 0) (< i (count $scope.incomes)) (inc-after! i)]
     (set! thisMonth
           (..
            $scope
            (convertToNumber (:amount (get $scope.incomes i)))))
     (if (not= thisMonth 0)
       (if (:active (get (-> $scope.incomes) i))
         (set! total
               (+ total
                  (* thisMonth (:frequency (get $scope.incomes i))))))))
    total)
  (defn $scope.monthlyExpense
    []
    (def total 0)
    (def thisMonth nil)
    (dofor
     [(def i 0) (< i (count $scope.expenses)) (inc-after! i)]
     (do
       (set! thisMonth
             (..
              $scope
              (convertToNumber (:amount (get $scope.expenses i)))))
       (if
           (not= thisMonth 0)
         (if
             (get (-> $scope :expenses) i :active)
           (set!
            total
            (+
             total
             (* thisMonth (:frequency (get $scope.expenses i)))))))))
    total)
  (defn $scope.monthlyNet
    []
    (do
      (def income (.. $scope monthlyIncome))
      (def expense (.. $scope monthlyExpense))
      (- income expense)))
  (defn
    $scope.montlyProjection
    []
    (def monthByMonth [])
    (def runningTotal 0)
    (def oneOff 0)
    (dofor
     [(def i 0) (< i 12) (inc-after! i)]
     (do
       (set! runningTotal (+ runningTotal (.. $scope monthlyNet)))
       (dofor
        [(def m 0)
         (< m (count $scope.nonRecurring))
         (inc-after! m)]
        (if
            (==
             (..
              $scope
              (convertToNumber (:month (get $scope.nonRecurring m))))
             (+ i 1))
          (do
            (set!
             oneOff
             (..
              $scope
              (convertToNumber
               (:amount (get $scope.nonRecurring m)))))
            (if
                (not= oneOff 0)
              (if
                  (:active (get $scope.nonRecurring m))
                (set! runningTotal (+ runningTotal oneOff)))))))
       (set! (get monthByMonth i) runningTotal)))
    monthByMonth)
  (defn $scope.getMonthLabel
    [monthAhead]
    (def d (new Date))
    (def currentMonth (.. d getMonth))
    (def year (.. d getFullYear))
    (def
      monthNames
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
    (if
        (> futureMonth 11)
      (do
        (set! futureMonth (- futureMonth 12))
        (set! year (+ year 1))))
    (+ (get monthNames futureMonth) " " year))
  (set!
   (-> $scope :positiveNegative)
   (fn
     [value]
     (if (> value 0) "positive")
     (if (< value 0) "negative")))
  (defn
    $scope.convertToNumber
    [value]
    (def floatNumber (parseFloat value))
    (if floatNumber floatNumber 0))
  (defn $scope.roundDown [number] (.. Math (round number)))
  (defn $scope.initForm
    []
    (if (< (count $scope.incomes) 1) (.. $scope addIncome))
    (if (< (count $scope.expenses) 1) (.. $scope addExpense))
    (if (< (count $scope.nonRecurring) 1)
      (.. $scope addTransaction)))
  (.. $scope initForm))
