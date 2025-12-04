package two_sum

func TwoSum(input []int, target int) []int {
	for i, num := range input {
		for j, num2 := range input[i:] {
			if num+num2 == target {
				return []int{i, i + j}
			}
		}
	}

	return []int{}
}
