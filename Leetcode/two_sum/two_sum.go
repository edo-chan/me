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

func TwoSumHash(input []int, target int) []int {
	complements := make(map[int]int)
	for i, num := range input {
		complements[num] = i
	}

	for i, num := range input {
		complement := target - num
		if firstIndex := complements[complement]; firstIndex != 0 {
			return []int{i, firstIndex}
		}
	}

	return []int{}
}
