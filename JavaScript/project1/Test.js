for (inNum = 1; inNum <= 500; inNum++) 
{
  let text = inNum.toString();
  n = text.split("");
  var sum = 0;
  var count = 0;

  for (i = 0; i < n.length; i++) 
  {
    for (j = 0; j < n.length; j++) 
    {
      if (n[i] === n[j]) 
      {
        count = count + 1;
      }
    }
  }

  if (text.length !== count) 
  {
    for (let l = 0; l < n.length; l++) 
    {
      sum += 1 * n[l];
    }
    if (sum <= 5) 
    {
      console.log(sum, text);
    }
  }
}
