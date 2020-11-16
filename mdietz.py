def mdietz(d, begval, endval, start_date = None, end_date = None, date_column='date', amount_column='amount'):

    d = sorted(d, key = lambda x: x[0])
    dates = [ i for i, j in d ]

    def do_sum(acc, x): 
        return 0, acc[1] + x[1]

    def wtd_sum(acc, x):
        delta = end_date - x[0]
        weight = delta.days/total_days
        return 0, acc[1] + -1 * x[1] * weight

    # total cashflows
    total_flows  =  reduce(do_sum, d)[1]
    
    if start_date is None: start_date = dates[0]
    if end_date is None: end_date = dates[-1]

    delta = end_date - start_date
    total_days = delta.days
    print(total_days, total_flows, reduce(wtd_sum, d, (0,0))[1])
    
    #Modified Dietz
    MD = (endval - begval + total_flows) / (begval + reduce(wtd_sum, d, (0,0))[1]);
    annualizedMD = (1+MD)**(365/(total_days-1)) - 1;

    return MD, annualizedMD
    

mdietz(
    tuple(zip(
        [date(2020, 1, 31), date(2020, 2, 28), date(2020, 3, 4), date(2020, 3, 31)], 
        [-3429030, -6737065, 546250, -4512623])), 
    122504000,    
    137076700,
    date(2019, 12, 31),
    date(2020, 3, 31)
    )
