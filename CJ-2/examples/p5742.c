#include <stdio.h>

struct Student {
    int id, academic, activity;
    double weighted;
};

int is_excellent(const struct Student *s) {
    int a = s->academic;
    int b = s->activity;
    return a + b > 140 && 7 * a + 3 * b >= 800;
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    for (int i = 0; i < n; i++) {
        struct Student student;
        if (scanf("%d %d %d", &student.id, &student.academic,
                  &student.activity) != 3) return 0;
        student.weighted = (7 * student.academic + 3 * student.activity) / 10.0;
        if (is_excellent(&student))
            puts("Excellent");
        else
            puts("Not excellent");
    }
}
