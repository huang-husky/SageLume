#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> seen;  // 哈希表：{数值 → 下标}

        for (int c = 0; c < (int)nums.size(); c++) {
            int complement = target - nums[c];

            if (seen.count(complement)) {
                return {seen[complement], c};
            }
            seen[nums[c]] = c;
        }
        return {};  // 题目保证有解，不会执行到这里
    }
};

// --- 验证 ---
// twoSum([2, 7, 11, 15], 9)  →  [0, 1]
// twoSum([3, 2, 4],      6)  →  [1, 2]
