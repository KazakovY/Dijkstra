let s = '(2+3)*5/(4-2)*2';
    let stuck = new Array();
    let out = new Array();
    let preo = {
        '+': 0,
        '-': 0,
        '*': 1,
        '/': 1,
        '^': 2,
    }
    function checkDig(s, start){
        let num = '';

        for (let  i = start; i < s.length; i++){
            while (s[i] == parseInt(s[i])){
                num += s[i++];
            }
            return num;
        }
    }
    function dijstra(s) {
        for (let i = 0; i < s.length; i++) {
            if (s[i] == parseInt(s[i])) {
                let num = checkDig(s, i);
                out.push(num);
                i += num.length - 1;
                continue;
            }
            if (s[i] in preo) {
                while (preo[s[i]] <= preo[stuck[stuck.length - 1]]) {
                    out.push(stuck.pop());
                }
                stuck.push(s[i]);
            }
            if (s[i] == '(') {
                stuck.push(s[i]);
                continue;
            }
            if (s[i] == ')') {
                while (stuck[stuck.length - 1] != '(') {
                    out.push(stuck.pop());
                }
                stuck.pop();
                continue
            }
        }

        function twoLastNum(numStack) {
            let twoNum = new Array();
            while (twoNum.length != 2) {
                twoNum.push(numStack.pop());
            }
            return twoNum;
        }

        while (stuck.length != 0) {
            out.push(stuck.pop());
        }
        let result = 0;
        let numStack = new Array();
        for (let i = 0; i < out.length; i++) {
            if (out[i] == parseInt(out[i])) {
                numStack.push(parseInt(out[i]));
                continue;
            }
            if (out[i] in preo) {
                let num = twoLastNum(numStack);
                if (out[i] == '+') {
                    result = num[1] + num[0];
                    numStack.push(result);
                    continue;
                }
                if (out[i] == '-') {
                    result = num[1] - num[0];
                    numStack.push(result);
                    continue;
                }
                if (out[i] == '*') {
                    result = num[1] * num[0];
                    numStack.push(result);
                    continue;
                }
                if (out[i] == '/') {
                    result = num[1] / num[0];
                    numStack.push(result);
                    continue;
                }
                if (out[i] == '^') {
                    result = Math.pow(num[1], num[0]);
                    numStack.push(result);
                    continue;
                }

            }
        }
        function delet(out) {
            let newOut = out.toString();
            for (let i = 0; i < newOut.length; i++) {
                if (newOut[i] == ',') {
                    newOut = newOut.replace(',', '')
                }
            }
            return newOut;
        }
        out = delet(out);
        return `${out} = ${result}`;
    }
   console.log(dijstra(s));
