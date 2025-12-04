package two_sum

import (
	"fmt"
	"testing"
)

func TestTwoSum(t *testing.T) {
	input := []int{2, 7, 11, 15}
	fmt.Println(TwoSum(input, 9))
	fmt.Println(TwoSum(input, 18))
	fmt.Println(TwoSum(input, 26))
	fmt.Println(TwoSum(input, 22))

	fmt.Println("negative cases")

	input = []int{-1, -2, -3, 5}
	fmt.Println(TwoSum(input, -3))
	fmt.Println(TwoSum(input, -5))
	fmt.Println(TwoSum(input, 3))
}
