#include <stdio.h>
int main(void) {
    int L, m, removed[10005] = {0};
    if (scanf("%d %d", &L, &m) != 2) return 1;
    for (int k = 0; k < m; k++) {
        int u, v;
        if (scanf("%d %d", &u, &v) != 2) return 1;
        for (int i = u; i <= v; i++) removed[i] = 1;
    }
    int answer = 0;
    for (int i = 0; i <= L; i++)
        if (removed[i] == 0) answer++;
    printf("%d\n", answer);
    return 0;
}
