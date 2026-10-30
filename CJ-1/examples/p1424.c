#include <stdio.h>
int main(void) {
    int day, n, total = 0;
    if (scanf("%d %d", &day, &n) != 2) return 1;
    for (int i = 0; i < n; i++) {
        if (day <= 5) total += 250;
        if (day == 7) day = 1;
        else day++;
    }
    printf("%d\n", total);
    return 0;
}
