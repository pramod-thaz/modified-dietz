Public Function MDIETZ(dStartValue As Double, dEndValue As Double, dtStart As Date, dtEnd As Date, rCash As Range, rDates As Range) As Double

    Dim i As Integer: Dim Cash() As Double: Dim Days() As Date
    Dim Cell As Range: Dim SumCash As Double: Dim TempSum As Double

    
    Dim T As Integer
    Dim count As Integer
    
    T = dtEnd - dtStart
    count = 0
    TempSum = 0
    
    For i = 0 To (rCash.Cells.count - 1)
            If ((rDates(i) > dtStart) And (rDates(i) <= dtEnd) And (rCash(i) <> 0)) Then
                If (Not Not Cash) = 0 Then
                    ReDim Preserve Cash(0 To 0)
                    ReDim Preserve Days(0 To 0)
                Else
                    ReDim Preserve Cash(0 To UBound(Cash) + 1)
                    ReDim Preserve Days(0 To UBound(Days) + 1)
                End If
                Cash(count) = rCash(i)
                Days(count) = rDates(i)
                count = count + 1
            End If
    Next i
    
    If (Not Cash) = -1 Then
        SumCash = 0
        MDIETZ = (dEndValue - dStartValue) / (dStartValue)
    Else
        SumCash = Application.WorksheetFunction.Sum(Cash)
        TempSum = 0
        For i = 0 To UBound(Cash)
                TempSum = TempSum + (((dtEnd - Days(i)) / T) * Cash(i) * -1)
        Next i
    
        MDIETZ = (dEndValue - dStartValue + SumCash) / (dStartValue + TempSum)
    End If



End Function
