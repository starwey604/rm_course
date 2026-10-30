#include <stdio.h>
int main(void) {
    int a[105], n = 0, x;
    while (scanf("%d", &x) == 1 && x != 0) a[n++] = x;
    for (int i = n - 1; i >= 0; i--) {
        printf("%d", a[i]);
        if (i > 0) printf(" ");
    }
    printf("\n");
    return 0;
}
