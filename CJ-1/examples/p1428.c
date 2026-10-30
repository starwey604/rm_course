#include <stdio.h>
int main(void) {
    int n, a[105];
    if (scanf("%d", &n) != 1) return 1;
    for (int i = 0; i < n; i++)
        if (scanf("%d", &a[i]) != 1) return 1;
    for (int i = 0; i < n; i++) {
        int count = 0;
        for (int j = 0; j < i; j++)
            if (a[j] < a[i]) count++;
        printf("%d", count);
        if (i + 1 < n) printf(" ");
    }
    printf("\n");
    return 0;
}
