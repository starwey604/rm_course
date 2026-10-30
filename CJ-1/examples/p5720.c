#include <stdio.h>
int main(void) {
    int a, day = 1;
    if (scanf("%d", &a) != 1) return 1;
    while (a > 1) { a /= 2; day++; }
    printf("%d\n", day);
    return 0;
}
