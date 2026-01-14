#!/usr/bin/env sbcl --script

(defun format-file (path)
  (with-open-file (in path :direction :input)
    (let ((forms '()))
      (handler-case
          (loop for form = (read in nil :eof)
                until (eq form :eof)
                do (push form forms))
        (error (e)
          (format *error-output* "Failed to read ~a: ~a~%" path e)
          (sb-ext:quit :unix-status 1)))
      (with-open-file (out path :direction :output :if-exists :supersede)
        (dolist (form (nreverse forms))
          (pprint form out)
          (terpri out))))))

(let ((args (rest sb-ext:*posix-argv*)))
  (if args
      (format-file (first args))
      (format *error-output* "Usage: format-lisp.lisp <file>~%")))
