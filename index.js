kaplay({
    background: [0, 108, 166],
});

loadSprite("bean", "assets/bean.png");
loadSprite("apple", "assets/apple.png");

let speed = 800;
let borderScreen = width() - 300;
let score = 0;
setGravity(1200);


const player = add([
    sprite("bean"),
    pos(width() / 2, height() - 100),
    scale(2.5),
    anchor("center"),
    area(),
    body(),
    "player",

]);

const platform = add([
    pos(0, height() - 100),
    rect(width(), 50),
    color(0, 30, 46),
    outline(5),
    area(),
    body({isStatic: true}),

]);

const scoreLabel = add([
    text(score),
    pos(width() / 2, 30),
    scale(2),
]);

function spawnApples(){
    const apples = add([
        sprite("apple"),
        pos(rand(100, borderScreen), 30),
        scale(2),
        area(),
        anchor("center"),
        move(DOWN, 200),
        "apple",
    ]);

    wait(rand(1, 2.0), () => {
        spawnApples();
    })
};

spawnApples();

player.onCollide("apple", (apple) => {
    addKaboom(player.pos);
    destroy(apple);
    score++;
    scoreLabel.text = score;
})

onKeyDown("left", () => {
    player.pos.x -= speed * dt();
});

onKeyDown("right", () => {
    player.pos.x += speed * dt();
});

