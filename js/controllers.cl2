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
    (for [non-recurring $scope.nonRecurring]
      (set! oneOff
            (..
             $scope
             (convertToNumber (:amount non-recurring))))
      (if (not= oneOff 0)
        (if (:active non-recurring)
          (set! total (+ total oneOff)))))
    total)
  (defn $scope.monthlyIncome
    []
    (def total 0)
    (def thisMonth nil)
    (for [income $scope.incomes]
      (set! thisMonth
            (.. $scope
                (convertToNumber (:amount income))))
      (if (not= thisMonth 0)
        (if (:active income)
          (set! total
                (+ total
                   (* thisMonth (:frequency income)))))))
    total)
  (defn $scope.monthlyExpense
    []
    (def total 0)
    (def thisMonth nil)
    (for [expense $scope.expenses]
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
  (defn $scope.monthlyNet
    []
    (def income (.. $scope monthlyIncome))
    (def expense (.. $scope monthlyExpense))
    (- income expense))
  (defn
    $scope.montlyProjection
    []
    (def monthByMonth [])
    (def runningTotal 0)
    (def oneOff 0)
    (for [i (range 12)]
      (set! runningTotal (+ runningTotal (.. $scope monthlyNet)))
      (for [non-recurring $scope.nonRecurring]
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
  (defn $scope.getMonthLabel
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
    (if
        (> futureMonth 11)
      (do
        (set! futureMonth (- futureMonth 12))
        (set! year (+ year 1))))
    (+ (get monthNames futureMonth) " " year))
  (defn $scope.positiveNegative
    [value]
    (if (> value 0) "positive")
    (if (< value 0) "negative"))
  (defn
    $scope.convertToNumber
    [value]
    (or (parseFloat value) 0))
  (defn $scope.roundDown [number] (.. Math (round number)))
  (defn $scope.initForm
    []
    (if (< (count $scope.incomes) 1) (.. $scope addIncome))
    (if (< (count $scope.expenses) 1) (.. $scope addExpense))
    (if (< (count $scope.nonRecurring) 1)
      (.. $scope addTransaction)))
  (.. $scope initForm))
