package two_sum

func TwoSum(nums []int, target int) []int {
	for i, num := range nums {
		for j, num2 := range nums[i:] {
			if num+num2 == target {
				return []int{i, i + j}
			}
		}
	}

	return []int{}
}
