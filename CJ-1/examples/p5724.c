#include <stdio.h>
int main(void) {
    int n, a[105];
    if (scanf("%d", &n) != 1) return 1;
    for (int i = 0; i < n; i++)
        if (scanf("%d", &a[i]) != 1) return 1;
    int min_val = a[0], max_val = a[0];
    for (int i = 1; i < n; i++) {
        if (a[i] < min_val) min_val = a[i];
        if (a[i] > max_val) max_val = a[i];
    }
    printf("%d\n", max_val - min_val);
    return 0;
}
