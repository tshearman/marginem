
(DEFUN HARMONIC (N)
  (LOOP FOR K FROM 1 TO N
        SUM (/ 1.0 K)))

(DEFUN REPORT-HARMONIC (N)
  (LET ((VALUE (HARMONIC N)))
    (FORMAT T "H~A = ~,4F~%" N VALUE)
    (WHEN (<= VALUE 0) (ERROR "Harmonic numbers must stay positive."))
    VALUE))

(DEFUN MAIN () (REPORT-HARMONIC 5) (REPORT-HARMONIC 10))

(MAIN)
