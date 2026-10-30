#include <stdio.h>
#include <string.h>
int main(void) {
    char s[101];
    if (scanf("%100s", s) != 1) return 1;
    int length = strlen(s);
    int left = 0, right = length - 1, ok = 1;
    while (left < right) {
        if (s[left] != s[right]) { ok = 0; break; }
        left++;
        right--;
    }
    if (ok) {
        printf("yes\n");
    } else {
        printf("no\n");
    }
    return 0;
}
