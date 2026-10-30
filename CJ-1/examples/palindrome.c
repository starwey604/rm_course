#include <stdio.h>
#include <string.h>
int main(void) {
    char s[101];
    if (scanf("%100s", s) != 1) return 1;
    int left = 0, right = (int)strlen(s) - 1, ok = 1;
    while (left < right) {
        if (s[left] != s[right]) { ok = 0; break; }
        left++;
        right--;
    }
    printf("%s\n", ok ? "yes" : "no");
    return 0;
}
