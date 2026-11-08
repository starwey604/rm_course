#include <stdio.h>

struct Student {
    int id, academic, activity;
    int weighted10;  // 综合分 × 10
};

int total_score(const struct Student *s) {
    return s->academic + s->activity;
}

int is_excellent(const struct Student *s) {
    return total_score(s) > 140 && s->weighted10 >= 800;
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    for (int i = 0; i < n; i++) {
        struct Student student;
        if (scanf("%d %d %d", &student.id, &student.academic,
                  &student.activity) != 3) return 0;
        student.weighted10 = 7 * student.academic + 3 * student.activity;
        if (is_excellent(&student))
            printf("Excellent\n");
        else
            printf("Not excellent\n");
    }
}
