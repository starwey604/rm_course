#include <assert.h>
#include <stdio.h>

struct Motor {
    int speed;
    int current;
    float angle;
    int temp;
    int state;
};

int clamp_speed(int speed, int limit) {
    if (speed > limit) return limit;
    if (speed < -limit) return -limit;
    return speed;
}

void stop_value(int speed) {
    speed = 0;
    printf("参数内：%d\n", speed);
}

void stop_motor(int *p) {
    *p = 0;
}

void swap(int *a, int *b) {
    int tmp = *a;
    *a = *b;
    *b = tmp;
}

void stop_copy(struct Motor m) {
    m.speed = 0;
    printf("副本内：%d\n", m.speed);
}

void control_motor(struct Motor *p) {
    p->speed = 0;
}

void clamp_all(int a[], int n, int limit) {
    for (int i = 0; i < n; i++) {
        a[i] = clamp_speed(a[i], limit);
    }
}

int main(void) {
    assert(clamp_speed(8000, 8000) == 8000);
    assert(clamp_speed(-8000, 8000) == -8000);
    int s1 = 9600, s2 = -9600, s3 = 9600, s4 = 6000, limit = 8000;
    s1 = clamp_speed(s1, limit);
    s2 = clamp_speed(s2, limit);
    s3 = clamp_speed(s3, limit);
    s4 = clamp_speed(s4, limit);
    printf("函数限幅：%d %d %d %d\n", s1, s2, s3, s4);

    int speed = 9600;
    stop_value(speed);
    printf("值传后：%d\n", speed);
    stop_motor(&speed);
    printf("传地址后：%d\n", speed);

    swap(&s1, &s2);
    printf("交换后：%d %d\n", s1, s2);

    struct Motor motors[4] = {0};
    motors[2].speed = 9600;
    motors[2].temp = 30;
    stop_copy(motors[2]);
    printf("副本返回后：%d\n", motors[2].speed);
    control_motor(&motors[2]);
    printf("原件更新后：%d，温度：%d\n", motors[2].speed, motors[2].temp);

    int speeds[4] = {9600, -9600, 9600, 6000};
    clamp_all(speeds, 4, 8000);
    printf("数组限幅：%d %d %d %d\n", speeds[0], speeds[1], speeds[2], speeds[3]);
}
