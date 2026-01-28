import React from "react";
import { Link } from "react-router-dom";
import { useProductContext } from "../../context/ProductContext";

export default function ProductDetailsCard({ productData }) {

  const { setProductContext } = useProductContext();

  if (!productData) {
    return <p className="text-gray-500">Loading Please Wait!</p>;
  }

  const {
    image_front_url,
    image_url,
    product_name,
    brands,
    quantity,
    categories,
    nutriscore_grade,
    ingredients,
    allergens_tags,
    allergens,
    ingredients_analysis_tags,
    nutriments,
  } = productData;

  const medicalRiskRules = [
    {
      label: "High sugar content — may increase risk for diabetes",
      condition: nutriments?.sugars_100g > 15,
      icon: "⚠️",
    },
    // {
    //   label: "High salt content — may contribute to hypertension",
    //   condition: nutriments?.salt_100g > 1.5,
    //   icon: "⚠️",
    // },
    {
      label: "High saturated fat — linked to heart disease and obesity",
      condition: nutriments?.saturated_fat_100g > 5,
      icon: "⚠️",
    },
    {
      label: "High calorie density — not ideal for weight management",
      condition: nutriments?.energy_kcal_100g > 400,
      icon: "⚠️",
    },
    {
      label: "Contains palm oil — may affect cholesterol levels",
      condition: ingredients_analysis_tags?.includes("en:palm-oil"),
      icon: "🛢️",
    },
    {
      label: "Not suitable for vegan diets",
      condition: ingredients_analysis_tags?.includes("en:non-vegan"),
      icon: "🚫",
    },
  ];

    // console.log(ingredients);

  //   const harmfulItems = [
  //     nutriments?.sugars_100g && `Sugar: ${nutriments.sugars_100g}%`,
  //     nutriments?.salt_100g && `Salt: ${nutriments.salt_100g}%`,
  //     nutriments?.saturated_fat_100g && `Saturated Fat: ${nutriments.saturated_fat_100g}%`,
  //     ...(ingredients_analysis_tags || []).map(tag =>
  //       tag.replace("en:", "").replace(/-/g, " ")
  //     ),
  //   ].filter(Boolean);

  const allergenList = allergens_tags?.length
    ? allergens_tags.map((tag) => tag.replace("en:", "")).join(", ")
    : allergens || "None listed";

   const sortedIngredients = ingredients
  ? [...ingredients]
      .sort((a, b) => (b.percent_estimate || 0) - (a.percent_estimate || 0))
      .filter(
        (item, index, self) =>
          index === self.findIndex((i) => i.id === item.id)
      )
  : [];



  return (
    <div className="relative  bg-white rounded-md shadow-md p-4 border border-gray-200 max-w-md">
      <img
        src={image_front_url || image_url}
        alt={product_name || "Product Image"}
        className="w-full h-auto rounded-md mb-3  "
      />

      <p>
        <strong>Name:</strong> {product_name || "N/A"}
      </p>
      <p>
        <strong>Brand:</strong> {brands || "N/A"}
      </p>
      <p>
        <strong>Quantity:</strong> {quantity || "N/A"}
      </p>
      <p>
        <strong>Categories:</strong> {categories || "N/A"}
      </p>

      {/* <p><strong>Nutri-Score:</strong> {nutriscore_grade || "N/A"}</p> */}

      {/* 🩺 Medical Risk Flags */}
      {medicalRiskRules.some((rule) => rule.condition) && (
        <div className="mt-4">
          {/* <p className="font-semibold text-red-700 mb-2">
            Medical Risk Indicators:
            </p> */}
            <h2 className="font-bold text-red-700 " >Attentions:</h2>
          <ol className="list-decimal list-inside text-sm text-red-600">
            {medicalRiskRules.map((rule, index) =>
              rule.condition ? (
                <li key={index}>
                  {rule.icon} {rule.label}
                </li>
              ) : null
            )}
          </ol>
        </div>
      )}

      {/* 🍽️ Ingredients Table */}
      <div className="mt-4">
        <p className="font-semibold mb-2">Ingredients Breakdown:</p>
        {sortedIngredients?.length ? (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border border-gray-300 rounded-md">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">Ingredient</th>
                  {/* <th className="px-4 py-2 text-left">Analysis</th> */}
                  <th className="px-4 py-2 text-left">%(if known)</th>
                </tr>
              </thead>
              <tbody>
                {sortedIngredients.map((item, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-4 py-2">{item.text || "N/A"}</td>
                    {/* <td className="px-4 py-2 text-red-600">
                      {
                      item.analysis_tags?.length
                        ? item.analysis_tags
                            .map((tag) =>
                              tag.replace("en:", "").replace(/-/g, " ")
                            )
                            .join(", ")
                        : "—"}
                    </td> */}
                    <td className="px-4 py-2">
                      {item.percent_estimate>0 ? `${item.percent_estimate.toFixed(1)}%`
                        : "—"
                        }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">
            No detailed ingredient data available.
          </p>
        )}
      </div>

      {/* 🧬 Allergens */}
      <div className="mt-4">
        <p>
          <strong>Allergens:</strong> {allergenList}
        </p>
      </div>

      {/* 
            <div className="mt-4">
  <p className="font-semibold text-red-700 mb-2">Medical Risk Indicators:</p>
  <ul className="list-disc list-inside text-sm text-red-600">
    {nutriments?.sugars_100g > 15 && (
      <li>⚠️ High sugar content — may increase risk for diabetes</li>
    )}
    {nutriments?.salt_100g > 1.5 && (
      <li>⚠️ High salt content — may contribute to hypertension</li>
    )}
    {nutriments?.saturated_fat_100g > 5 && (
      <li>⚠️ High saturated fat — linked to heart disease and obesity</li>
    )}
    {nutriments?.energy_kcal_100g > 400 && (
      <li>⚠️ High calorie density — not ideal for weight management</li>
    )}
    {ingredients_analysis_tags?.includes("en:palm-oil") && (
      <li>⚠️ Contains palm oil — may affect cholesterol levels</li>
    )}
    {ingredients_analysis_tags?.includes("en:non-vegan") && (
      <li>⚠️ Not suitable for vegan diets</li>
    )}
  </ul>
</div> */}

      {/* ⚠️ Harmful Content */}
      {/* {harmfulItems.length > 0 && (
        <div className="mt-4">
          <p><strong>Potentially Harmful Ingredients:</strong></p>
          <ul className="list-disc list-inside text-sm text-red-600">
            {harmfulItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )} */}

     <Link to={'/chatwithai'} >
    {productData &&  <button onClick={setProductContext({...productData})} className="w-[100%] mt-4 px-4 py-2 bg-[#149e52] text-white rounded hover:bg-green-400">
        Ask AI
      </button> }
     </Link>
    </div>
  );
}
