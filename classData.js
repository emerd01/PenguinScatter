var homeworkMean = function (penguin) {
    var getHWGrade = function (homework) {
        return homework.grade
    }
    var homeworkGrade = penguin.homework.map(getHWGrade)
    return d3.mean(homeworkGrade)
}

var quizMean = function (penguin) {
    var getQuizGrade = function (quiz) {
        return quiz.grade
    }
    var quizGrade = penguin.quizes.map(getQuizGrade)
    return d3.mean(quizGrade)
}

var finalMean = function (penguin) {
    getFinalGrade = function (final) {
        return final.grade
    }
    var finalGrade = penguin.final.map(getFinalGrade)
    return d3.mean(finalGrade)
}

var getPhoto = function (penguin) {
    return "imgs/" + penguin.picture
}

var drawPlot = function (penguins, screen, xScale, yScale) {
    d3.select("#graph")
        .selectAll("circle")
        .data(penguins)
        .enter()
        .append("circle")
        .attr("cx", function (penguin) {
            return xScale(penguin.final[0].grade)
        })
        .attr("cy", function (penguin) {
            return yScale(homeworkMean(penguin))
        })
        .attr("r", 5)





        .on("mouseenter", function (penguin) {
            console.log("hovering")
            var xPos = d3.event.pageX;
            var yPos = d3.event.pageY;

            d3.select("#tooltip")
                .classed("hidden", false)
                .style("top", yPos + "px")
                .style("left", xPos + "px")

            d3.select("#pics")
                .append("img")
                .attr("src", "imgs/" + penguin.picture)

            d3.select("#final")
                .text(finalMean(penguin))

        })

        .on("mouseleave", function (penguin) {
            d3.select("#tooltip")
                .classed("hidden", true)

            d3.select("img")
                .remove()
        })

}


var drawHWvQuiz = function (penguins, screen, xScale, yScale) {
    d3.select("#graph")
        .selectAll("circle")
        .data(penguins)
        .enter()
        .append("circle")
        .attr("cx", function (penguin) {
            return xScale(quizMean(penguin))
        })
        .attr("cy", function (penguin) {
            return yScale(homeworkMean(penguin))
        })
        .attr("r", 5)





        .on("mouseenter", function (penguin) {
            console.log("hovering")
            var xPos = d3.event.pageX;
            var yPos = d3.event.pageY;

            d3.select("#tooltip")
                .classed("hidden", false)
                .style("top", yPos + "px")
                .style("left", xPos + "px")

            d3.select("#pics")
                .append("img")
                .attr("src", "imgs/" + penguin.picture)

        })

        .on("mouseleave", function (penguin) {
            d3.select("#tooltip")
                .classed("hidden", true)

            d3.select("img")
                .remove()
        })

}


var drawFinalvHW = function (penguins, screen, xScale, yScale) {
    d3.select("#graph")
        .selectAll("circle")
        .data(penguins)
        .enter()
        .append("circle")
        .attr("cx", function (penguin) {
            return xScale(finalMean(penguin))
        })
        .attr("cy", function (penguin) {
            return yScale(homeworkMean(penguin))
        })
        .attr("r", 5)





        .on("mouseenter", function (penguin) {
            console.log("hovering")
            var xPos = d3.event.pageX;
            var yPos = d3.event.pageY;

            d3.select("#tooltip")
                .classed("hidden", false)
                .style("top", yPos + "px")
                .style("left", xPos + "px")

            d3.select("#pics")
                .append("img")
                .attr("src", "imgs/" + penguin.picture)

        })

        .on("mouseleave", function (penguin) {
            d3.select("#tooltip")
                .classed("hidden", true)

            d3.select("img")
                .remove()
        })

}

var drawFinalvQuiz = function (penguins, screen, xScale, yScale) {
    d3.select("#graph")
        .selectAll("circle")
        .data(penguins)
        .enter()
        .append("circle")
        .attr("cx", function (penguin) {
            return xScale(finalMean(penguin))
        })
        .attr("cy", function (penguin) {
            return yScale(quizMean(penguin))
        })
        .attr("r", 5)





        .on("mouseenter", function (penguin) {
            console.log("hovering")
            var xPos = d3.event.pageX;
            var yPos = d3.event.pageY;

            d3.select("#tooltip")
                .classed("hidden", false)
                .style("top", yPos + "px")
                .style("left", xPos + "px")

            d3.select("#pics")
                .append("img")
                .attr("src", "imgs/" + penguin.picture)

        })

        .on("mouseleave", function (penguin) {
            d3.select("#tooltip")
                .classed("hidden", true)

            d3.select("img")
                .remove()
        })

}



var initGraph = function (penguins) {
    var screen = {
        width: 600,
        height: 600
    }

    d3.select("#graph")
        .attr("width", screen.width)
        .attr("height", screen.height)

    var xScale = d3.scaleLinear()
        .domain([0, 100])
        .range([0, screen.width])

    var yScale = d3.scaleLinear()
        .domain([0, 100])
        .range([screen.height, 0])


    drawPlot(penguins, screen, xScale, yScale)
    
    d3.select("#hwVquiz")
        .on("click", function()
            {
            d3.selectAll("circle")
                .remove()
        drawHWvQuiz(penguins, screen, xScale, yScale)
    })
    
    
    d3.select("#FinalVhw")
        .on("click", function()
            {
            d3.selectAll("circle")
                .remove()
        drawFinalvHW(penguins, screen, xScale, yScale)
    })
    
    d3.select("#FinalvQuiz")
        .on("click", function()
            {
            d3.selectAll("circle")
                .remove()
        drawFinalvQuiz(penguins, screen, xScale, yScale)
    })
    


}




var classPromise = d3.json("classData.json")

var successFCN = function (penguins) {
    console.log("penguins", penguins)
    setBanner("Here are your penguins")
    initGraph(penguins)

}

var failureFCN = function (error) {
    console.log("error", error)
    setBanner("Penguins not found")
}

classPromise.then(successFCN, failureFCN)

var setBanner = function (message) {
    d3.select("#banner")
        .text(message)
}
