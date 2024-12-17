# idiot-sort

Testing out the worst sorting algorithm I've ever seen.

## Background

There's this wonderfully stupid sorting algorithm I've seen show up from
time to time that goes something like this:

```js
const nums = [1, 7, 2, 6, 3, 5, 4];
nums.forEach((num) => {
  setTimeout(() => {
    console.log(num);
  }, num);
});
```

[(reference)](https://www.threads.net/@yernar.amergaliyev/post/DDlMG5si9sV?xmt=AQGzKNjcz9ppC1jHRx-6CGovv5buN0q3Q42sZrBIcACvGg)

After some discussion recently about this, I decided to write this algorithm
and build a testing framework to validate whether this always returns a sorted
array. JavaScript timers are notoriously unreliable, and there is no guarantee
they execute after the requested elapsed time.

However, what's not clear to me is whether the relative ordering of the calls
is guaranteed or preserved. For example, if we did the following:

```js
setTimeout(doFoo, 0);
setTimeout(doBar, 10);
setTimeout(doBaz, 20);
```

We know that these timers may not actually fire at 0ms, 10ms, or 20ms, but do
they always fire in the correct order? I don't know the answer, and I think by
running this repeatedly we should be able to see some rate of errors that would
prove that this is non-deterministic.
