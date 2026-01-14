module Main where

import Control.Monad (when)
import Text.Printf (printf)

harmonic :: Int -> Double
harmonic n = sum [1 / fromIntegral k | k <- [1 .. n]]

reportHarmonic :: Int -> IO ()
reportHarmonic n = do
  let value = harmonic n
  printf "H_%d = %.4f\n" n value
  when (value <= 0) $
    error "Harmonic numbers must be positive"

main :: IO ()
main = do
  reportHarmonic 5
  reportHarmonic 10
