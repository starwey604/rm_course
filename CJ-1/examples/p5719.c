#include <stdio.h>
int main(void) {
    int n, k, sa = 0, sb = 0, ca = 0, cb = 0;
    if (scanf("%d %d", &n, &k) != 2) return 1;
    for (int i = 1; i <= n; i++) {
        if (i % k == 0) { sa += i; ca++; }
        else { sb += i; cb++; }
    }
    printf("%.1f %.1f\n", 1.0 * sa / ca, 1.0 * sb / cb);
    return 0;
}
