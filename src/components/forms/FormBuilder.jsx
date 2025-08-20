"use client"

import styles from "../../pages/DashboardPage.module.css"

const FormBuilder = ({
  formTypes,
  evaluatorTypes,
  formBuilder,
  setFormBuilder,
  currentSection,
  setCurrentSection,
  currentCriterion,
  setCurrentCriterion,
  addCriterionToSection,
  removeCriterionFromSection,
  addSectionToForm,
  removeSectionFromForm,
  saveForm,
  cancel,
  editingForm,
}) => {
  return (
    <div className={styles.formBuilderContainer}>
      <div className={styles.formBuilderHeader}>
        <h2>{editingForm ? "Edit Evaluation Form" : "Create New Evaluation Form"}</h2>
        <div className={styles.formBuilderActions}>
          <button className={styles.saveFormButton} onClick={saveForm}>
            Save Form
          </button>
          <button className={styles.cancelFormButton} onClick={cancel}>
            Cancel
          </button>
        </div>
      </div>
      <div className={styles.formBuilderContent}>
        <div className={styles.formBuilderSection}>
          <h3>Form Details</h3>
          <div className={styles.formBuilderGrid}>
            <div className={styles.formField}>
              <label>Form Title</label>
              <input
                type="text"
                value={formBuilder.title}
                onChange={(e) => setFormBuilder((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="Enter form title"
                className={styles.formInput}
              />
            </div>
            <div className={styles.formField}>
              <label>Form Type</label>
              <select
                value={formBuilder.formType}
                onChange={(e) =>
                  setFormBuilder((prev) => ({
                    ...prev,
                    formType: e.target.value,
                    weight:
                      e.target.value === "workrate"
                        ? 70
                        : e.target.value === "behavioral" && formBuilder.targetEvaluator === "admin"
                        ? 10
                        : e.target.value === "behavioral" && formBuilder.targetEvaluator === "peer"
                        ? 15
                        : e.target.value === "behavioral" && formBuilder.targetEvaluator === "self"
                        ? 5
                        : 0,
                  }))
                }
                className={styles.formSelect}
              >
                {formTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.formField}>
              <label>Target Evaluator</label>
              <select
                value={formBuilder.targetEvaluator}
                onChange={(e) =>
                  setFormBuilder((prev) => ({
                    ...prev,
                    targetEvaluator: e.target.value,
                    weight:
                      prev.formType === "workrate"
                        ? 70
                        : e.target.value === "admin"
                        ? 10
                        : e.target.value === "peer"
                        ? 15
                        : 5,
                  }))
                }
                className={styles.formSelect}
              >
                {evaluatorTypes.map((evaluator) => (
                  <option key={evaluator.id} value={evaluator.id}>
                    {evaluator.name}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.formField}>
              <label>Weight (%)</label>
              <input
                type="number"
                min="1"
                max="100"
                value={formBuilder.weight}
                onChange={(e) => setFormBuilder((prev) => ({ ...prev, weight: Number.parseInt(e.target.value) || 0 }))}
                className={styles.formInput}
                disabled={formBuilder.formType === "workrate"}
              />
            </div>
            <div className={styles.formField + " " + styles.fullWidth}>
              <label>Description</label>
              <textarea
                value={formBuilder.description}
                onChange={(e) => setFormBuilder((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Enter form description"
                className={styles.formTextarea}
                rows="3"
              />
            </div>
          </div>
        </div>

        <div className={styles.formBuilderSection}>
          <h3>Add Section</h3>
          <div className={styles.formBuilderGrid}>
            <div className={styles.formField}>
              <label>Section Name</label>
              <input
                type="text"
                value={currentSection.name}
                onChange={(e) => setCurrentSection((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Enter section name"
                className={styles.formInput}
              />
            </div>
            <div className={styles.formField}>
              <label>Section Weight (%)</label>
              <input
                type="number"
                min="1"
                max="100"
                value={currentSection.weight}
                onChange={(e) => setCurrentSection((prev) => ({ ...prev, weight: Number.parseInt(e.target.value) || 0 }))}
                placeholder="Enter weight percentage"
                className={styles.formInput}
                disabled={formBuilder.formType === "behavioral"}
              />
            </div>
          </div>

          <div className={styles.criteriaBuilder}>
            <h4>Add Evaluation Criteria</h4>
            <div className={styles.criteriaInputs}>
              <div className={styles.formField}>
                <label>Criterion Name</label>
                <input
                  type="text"
                  value={currentCriterion.name}
                  onChange={(e) => setCurrentCriterion((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter criterion name"
                  className={styles.formInput}
                />
              </div>
              <div className={styles.formField}>
                <label>Criterion Weight (%)</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={currentCriterion.weight}
                  onChange={(e) => setCurrentCriterion((prev) => ({ ...prev, weight: Number.parseInt(e.target.value) || 0 }))}
                  placeholder="Enter weight percentage"
                  className={styles.formInput}
                />
              </div>
              <button onClick={addCriterionToSection} className={styles.addCriterionButton}>
                Add Criterion
              </button>
            </div>

            {currentSection.criteria.length > 0 && (
              <div className={styles.currentCriteria}>
                <h5>Section Criteria:</h5>
                <div className={styles.criteriaList}>
                  {currentSection.criteria.map((criterion) => (
                    <div key={criterion.id} className={styles.criterionItem}>
                      <span>
                        {criterion.name} ({criterion.weight}%)
                      </span>
                      <button onClick={() => removeCriterionFromSection(criterion.id)} className={styles.removeCriterionButton}>
                        Remove
                      </button>
                    </div>
                  ))}
                  <div className={styles.criteriaTotal}>
                    Total: {currentSection.criteria.reduce((sum, c) => sum + c.weight, 0)}%
                  </div>
                </div>
              </div>
            )}
            <button
              onClick={addSectionToForm}
              className={styles.addSectionButton}
              disabled={!currentSection.name || currentSection.weight === 0 || currentSection.criteria.length === 0}
            >
              Add Section to Form
            </button>
          </div>
        </div>

        {formBuilder.sections.length > 0 && (
          <div className={styles.formBuilderSection}>
            <h3>Form Preview - Total Weight: {formBuilder.weight}%</h3>
            <div className={styles.formPreview}>
              {formBuilder.sections.map((section) => (
                <div key={section.id} className={styles.previewSection}>
                  <div className={styles.previewSectionHeader}>
                    <h4>{section.name}</h4>
                    <div className={styles.previewSectionActions}>
                      <span className={styles.sectionWeight}>{section.weight}%</span>
                      <button onClick={() => removeSectionFromForm(section.id)} className={styles.removeSectionButton}>
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className={styles.previewCriteria}>
                    {section.criteria.map((criterion) => (
                      <div key={criterion.id} className={styles.previewCriterion}>
                        <span>{criterion.name}</span>
                        <span className={styles.criterionWeight}>{criterion.weight}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default FormBuilder

