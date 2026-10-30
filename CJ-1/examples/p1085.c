#include <stdio.h>
int main(void) {
    int max_hours = 8, answer = 0;
    for (int day = 1; day <= 7; day++) {
        int a, b;
        if (scanf("%d %d", &a, &b) != 2) return 1;
        if (a + b > max_hours) { max_hours = a + b; answer = day; }
    }
    printf("%d\n", answer);
    return 0;
}
