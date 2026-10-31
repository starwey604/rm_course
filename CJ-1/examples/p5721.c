#include <stdio.h>
int main(void) {
    int n, value = 0;
    if (scanf("%d", &n) != 1) return 1;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n - i; j++) {
            value++;
            printf("%02d", value);
        }
        printf("\n");
    }
    return 0;
}
