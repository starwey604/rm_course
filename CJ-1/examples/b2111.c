#include <stdio.h>
#include <string.h>
int main(void) {
    double threshold;
    char a[501], b[501];
    if (scanf("%lf %500s %500s", &threshold, a, b) != 3) return 1;
    int count = 0, n = strlen(a);
    for (int i = 0; i < n; i++)
        if (a[i] == b[i]) count++;
    if (1.0 * count / n >= threshold) {
        printf("yes\n");
    } else {
        printf("no\n");
    }
    return 0;
}
